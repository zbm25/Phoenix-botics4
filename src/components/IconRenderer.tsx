import React from "react";
import {
  User,
  Coffee,
  ShoppingBag,
  Activity,
  Shield,
  Truck,
  Utensils,
  HeartPulse,
  FlaskConical,
  Warehouse,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Cloud,
  Cpu,
  ArrowRight,
  Menu,
  X,
  Phone,
  Info,
  Layers,
  Sparkles,
  Award,
  Clock,
  Compass,
  MapPin,
  Flame,
  Wrench,
  MonitorPlay
} from "lucide-react";

export type IconKey =
  | "User"
  | "Coffee"
  | "ShoppingBag"
  | "Activity"
  | "Shield"
  | "Truck"
  | "Utensils"
  | "HeartPulse"
  | "FlaskConical"
  | "Warehouse"
  | "Eye"
  | "CheckCircle2"
  | "ShieldCheck"
  | "Lock"
  | "Cloud"
  | "Cpu"
  | "ArrowRight"
  | "Menu"
  | "X"
  | "Phone"
  | "Info"
  | "Layers"
  | "Sparkles"
  | "Award"
  | "Clock"
  | "Compass"
  | "MapPin"
  | "Flame"
  | "Wrench"
  | "MonitorPlay";

interface IconRendererProps {
  name: IconKey | string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = "", size = 24 }) => {
  switch (name) {
    case "User":
      return <User className={className} size={size} />;
    case "Coffee":
      return <Coffee className={className} size={size} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} size={size} />;
    case "Activity":
      return <Activity className={className} size={size} />;
    case "Shield":
      return <Shield className={className} size={size} />;
    case "Truck":
      return <Truck className={className} size={size} />;
    case "Utensils":
      return <Utensils className={className} size={size} />;
    case "HeartPulse":
      return <HeartPulse className={className} size={size} />;
    case "FlaskConical":
      return <FlaskConical className={className} size={size} />;
    case "Warehouse":
      return <Warehouse className={className} size={size} />;
    case "Eye":
      return <Eye className={className} size={size} />;
    case "CheckCircle2":
      return <CheckCircle2 className={className} size={size} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} size={size} />;
    case "Lock":
      return <Lock className={className} size={size} />;
    case "Cloud":
      return <Cloud className={className} size={size} />;
    case "Cpu":
      return <Cpu className={className} size={size} />;
    case "ArrowRight":
      return <ArrowRight className={className} size={size} />;
    case "Menu":
      return <Menu className={className} size={size} />;
    case "X":
      return <X className={className} size={size} />;
    case "Phone":
      return <Phone className={className} size={size} />;
    case "Info":
      return <Info className={className} size={size} />;
    case "Layers":
      return <Layers className={className} size={size} />;
    case "Sparkles":
      return <Sparkles className={className} size={size} />;
    case "Award":
      return <Award className={className} size={size} />;
    case "Clock":
      return <Clock className={className} size={size} />;
    case "Compass":
      return <Compass className={className} size={size} />;
    case "MapPin":
      return <MapPin className={className} size={size} />;
    case "Flame":
      return <Flame className={className} size={size} />;
    case "Wrench":
      return <Wrench className={className} size={size} />;
    case "MonitorPlay":
      return <MonitorPlay className={className} size={size} />;
    default:
      return <Sparkles className={className} size={size} />;
  }
};
