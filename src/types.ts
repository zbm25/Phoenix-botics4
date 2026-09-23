/**
 * Types and interfaces for the Phoenix-Botics portfolio
 */

export interface RobotModel {
  name: string;
  manufacturer: string;
  type: string;
  specs: {
    height?: string;
    weight?: string;
    payload?: string;
    autonomy: string;
    sensors: string[];
  };
  description: string;
  benefits: string[];
  photo?: string;
  surface?: string;
  dimensions?: string;
}

export interface GammeRobots {
  id: string;
  label: string;
  tagline: string;
  iconName: string;
  color: string;
  comingSoon?: boolean;
  robots: RobotModel[];
}

export interface RobotCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  featuredRobot: string;
  robots: RobotModel[];
  keyBenefits: string[];
  iconName: "User" | "Coffee" | "ShoppingBag" | "Activity" | "Shield" | "Truck";
}

export interface IndustrySector {
  id: string;
  title: string;
  challenge: string;
  solution: string;
  valueProposition: string;
  efficiencyGain: string;
  iconName: "ShoppingBag" | "Utensils" | "HeartPulse" | "FlaskConical" | "Warehouse" | "Eye";
  supportedRobots: string[];
  imageUrl?: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  milestones: string[];
}

export interface TechPillar {
  title: string;
  description: string;
  iconName: "CheckCircle2" | "ShieldCheck" | "Lock" | "Cloud" | "Cpu";
}
