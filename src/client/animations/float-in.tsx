import { keyframes, css } from "@emotion/react";

export const floatInKeyFrame = keyframes`
	 from {
		opacity: 0;
		transform: translateY(32px);
	 }
	 to {
		 opacity: 1;
		 transform: none;
	 }
`;

export const floatInAnimationStyle = css`
	animation: ${floatInKeyFrame} 0.5s ease-in-out both;
`;
