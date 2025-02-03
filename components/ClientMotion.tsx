// components/ui/ClientMotion.tsx
"use client"; // Essential directive

import { motion, HTMLMotionProps } from "framer-motion";

// Create a typed component that accepts all motion.div props
const ClientMotion = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props} />;
};

export default ClientMotion;