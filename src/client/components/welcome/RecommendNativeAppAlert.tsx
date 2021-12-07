import styled from "@emotion/styled";
import React from "react";
import { floatInAnimationStyle } from "../../animations/float-in";

const BottomAlert = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
`;

export const RecommendNativeAppAlert: React.VFC = () => {
	return (
		<BottomAlert className="alert shadow-6" css={floatInAnimationStyle}>
		スマホアプリもあります。
			<a href="#">試す</a>
		</BottomAlert>
	);
};
