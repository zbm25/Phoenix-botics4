import { describe, it, expect } from "bun:test";
import { evaluateQualification } from "../evaluateQualification";
import { mapQualificationToContact } from "../mapQualificationToContact";

describe("evaluateQualification Engine", () => {
  it("should evaluate favorable status for optimal retail inputs", () => {
    const answers = {
      site_sub_environment: "monosite_flat",
      surface_area: "500_2000",
      cohabitation_type: "staff_only",
      project_timeline: "immediate",
      retail_passage_width: "wide_over_120",
      retail_primary_need: "floor_washing"
    };

    const res = evaluateQualification("retail", answers);
    expect(res.status).toBe("favorable");
    expect(res.statusTitle).toBe("Potentiel favorable identifié");
    expect(res.favorablePoints.length).toBeGreaterThan(0);
    expect(res.constraints.length).toBe(0);
    expect(res.recommendedRobots).toContain("uclean-scrub-50-disc");
    expect(res.disclaimer).toContain("Cette préqualification en ligne constitue une première orientation");
  });

  it("should evaluate conditional status when there are non-critical constraints", () => {
    const answers = {
      site_sub_environment: "multilevel_elevators",
      surface_area: "2000_5000",
      cohabitation_type: "sensitive_patients",
      project_timeline: "mid_term",
      health_transport_need: "pharmacy_meds",
      health_security_access: "rfid_badge"
    };

    const res = evaluateQualification("health", answers);
    expect(res.status).toBe("conditional");
    expect(res.statusTitle).toBe("Faisable sous réserve de validation technique");
    expect(res.constraints.length).toBeGreaterThan(0);
    expect(res.recommendedRobots).toContain("ulog-deliver-150");
  });

  it("should evaluate expert_required status when critical constraints like stairs are present", () => {
    const answers = {
      site_sub_environment: "multilevel_stairs_only",
      surface_area: "under_500",
      cohabitation_type: "staff_only",
      project_timeline: "immediate",
      hospitality_flow_type: "table_service_bussing",
      hospitality_obstacles: "thresholds_ramps"
    };

    const res = evaluateQualification("hospitality", answers);
    expect(res.status).toBe("expert_required");
    expect(res.statusTitle).toBe("Expertise technique nécessaire");
    expect(res.constraints.some((c) => c.includes("escalier"))).toBe(true);
  });

  it("should strictly filter recommended robots to allowedRobots for Industry sector", () => {
    const answers = {
      site_sub_environment: "monosite_flat",
      surface_area: "over_5000",
      cohabitation_type: "industrial_mix",
      project_timeline: "immediate",
      industry_load_type: "pallets_heavy_racks",
      industry_aisle_traffic: "wide_aisles_forklifts"
    };

    const res = evaluateQualification("industry", answers);
    expect(res.recommendedRobots).toContain("ulog-lift-600");
    // Ensure no uServe is allowed in industry
    expect(res.recommendedRobots).not.toContain("userve");
  });

  it("should map qualification to contact with structured data and summary text", () => {
    const answers = {
      site_sub_environment: "monosite_flat",
      surface_area: "500_2000",
      cohabitation_type: "staff_only",
      project_timeline: "immediate",
      retail_passage_width: "wide_over_120",
      retail_primary_need: "guidance_welcome"
    };

    const mapped = mapQualificationToContact("retail", answers);
    expect(mapped.structuredData.sector).toBe("retail");
    expect(mapped.suggestedModel).toBe("userve");
    expect(mapped.formattedSummary).toContain("[Préqualification Technique Phoenix-Botics]");
    expect(mapped.formattedSummary).toContain("Secteur: RETAIL");
  });

  it("should support multi-selection for primary needs and accumulate recommended robots", () => {
    const answers = {
      site_sub_environment: "monosite_flat",
      surface_area: "500_2000",
      cohabitation_type: "staff_only",
      project_timeline: "immediate",
      retail_passage_width: "wide_over_120",
      retail_primary_need: ["guidance_welcome", "floor_washing"]
    };

    const res = evaluateQualification("retail", answers);
    expect(res.recommendedRobots).toContain("userve");
    expect(res.recommendedRobots).toContain("uclean-scrub-50-disc");
    expect(res.recommendedRobots).toContain("uclean-compact");
  });

  it("should return suggestedModel as 'flotte-mixte' in mapQualificationToContact when 2 or more robots are recommended", () => {
    const answers = {
      site_sub_environment: "monosite_flat",
      surface_area: "500_2000",
      cohabitation_type: "staff_only",
      project_timeline: "immediate",
      retail_passage_width: "wide_over_120",
      retail_primary_need: ["guidance_welcome", "floor_washing"]
    };

    const mapped = mapQualificationToContact("retail", answers);
    expect(mapped.structuredData.evaluation.recommendedRobots.length).toBeGreaterThanOrEqual(2);
    expect(mapped.suggestedModel).toBe("flotte-mixte");
  });

  it("should correctly handle uLog ROI -> Industry prequalification flow mapping", () => {
    const answersSingle = {
      site_sub_environment: "monosite_flat",
      surface_area: "over_5000",
      cohabitation_type: "industrial_mix",
      project_timeline: "immediate",
      industry_load_type: "light_line_feed",
      industry_aisle_traffic: "wide_aisles_forklifts"
    };

    const mappedSingle = mapQualificationToContact("industry", answersSingle);
    expect(mappedSingle.sector).toBe("industry");
    expect(mappedSingle.structuredData.evaluation.recommendedRobots).toContain("ulog-deliver-80");
    expect(mappedSingle.structuredData.evaluation.recommendedRobots).toContain("ulog-deliver-150");
    expect(mappedSingle.suggestedModel).toBe("flotte-mixte");
    expect(mappedSingle.formattedSummary).toContain("Secteur: INDUSTRY");

    const answersHeavyScrub = {
      site_sub_environment: "monosite_flat",
      surface_area: "over_5000",
      cohabitation_type: "industrial_mix",
      project_timeline: "immediate",
      industry_load_type: "heavy_floor_scrub",
      industry_aisle_traffic: "wide_aisles_forklifts"
    };

    const mappedHeavy = mapQualificationToContact("industry", answersHeavyScrub);
    expect(mappedHeavy.structuredData.evaluation.recommendedRobots).toEqual(["uclean-scrub-75"]);
    expect(mappedHeavy.suggestedModel).toBe("uclean-scrub-75");
  });

  it("should correctly handle uServe ROI -> Hospitality prequalification flow mapping", () => {
    const answersHospitality = {
      site_sub_environment: "monosite_flat",
      surface_area: "500_2000",
      cohabitation_type: "public_and_staff",
      project_timeline: "immediate",
      hospitality_flow_type: "table_service_bussing",
      hospitality_obstacles: "smooth_elevators"
    };

    const mappedHospitality = mapQualificationToContact("hospitality", answersHospitality);
    expect(mappedHospitality.sector).toBe("hospitality");
    expect(mappedHospitality.structuredData.evaluation.recommendedRobots).toEqual(["userve"]);
    expect(mappedHospitality.suggestedModel).toBe("userve");
    expect(mappedHospitality.formattedSummary).toContain("Robots préconisés: userve");
  });
});
