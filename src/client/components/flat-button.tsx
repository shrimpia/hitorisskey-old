import styled from "@emotion/styled";

export const PlainButton = styled.button`
	background-color: transparent;
	border: none;
	cursor: pointer;
	outline: none;
	padding: 0 var(--margin);
	appearance: none;
`;

export const LinkedButton = styled(PlainButton)`
	color: var(--link);
`;

export const FlatButton = styled(PlainButton)`
	border-radius: var(--radius);
	&:hover {
		background: var(--hover);
	}
`;
