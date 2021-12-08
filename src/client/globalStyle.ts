import { css, keyframes } from "@emotion/react";

export const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(8px);
	}
	to {
		opacity: 1;
		transform: none;
	}
`;

export const globalStyle = css`
	body {
		--primary: var(--green);
		--primary-l: var(--green-l);
		--primary-d: var(--green-d);
	}

	.animate-fade {
		animation: ${fadeIn} 0.3s ease-out;
	}
`;
