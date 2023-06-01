import styled from "styled-components";
//Animation
const { motion } = require("framer-motion");

export const SidebarWrapper = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SidebarStyle = styled(motion.div)`
  width: 100%;
  overflow-y: auto;
  position: relative;
`;
