import React from 'react';
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const duration = '1.5s';
const delay = '0.07s';
const size = '64px';
const color = 'var(--primary)';

const SpinnerWrapper = styled.div`
	position: relative;
	width: ${size};
	height: ${size};
`;

const SpinnerBase = styled.div`
	position: absolute;
  left: 0;
  top: 0;
  content: '';
  width: ${size};
  height: ${size};
  background-color: none;
  border: 3px solid ${color};
  opacity: 0;
  translate: scale(0);
  border-radius: 100%;
`;

const scaleOut = keyframes`
	0% { 
		transform: scale(0);
		opacity: 1;
	}
	90% {
		transform: scale(1.0);
		opacity: 0;
	}
`;

const Spinner1 = styled(SpinnerBase)`animation: ${scaleOut} ${duration} infinite ease-out;`;
const Spinner2 = styled(SpinnerBase)`animation: ${scaleOut} ${duration} infinite ease-out calc(${delay} * 2);`;
const Spinner3 = styled(SpinnerBase)`animation: ${scaleOut} ${duration} infinite ease-out calc(${delay} * 4);`;

export const Spinner: React.VFC = () => {
	return (
		<SpinnerWrapper>
			<Spinner1 />
			<Spinner2 />
			<Spinner3 />
		</SpinnerWrapper>
	);
};
