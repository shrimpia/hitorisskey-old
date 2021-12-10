import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router";

import { useSelector } from "../store";
import { Menu } from "./menu";

const LayoutWrapper = styled.div`
	position: relative;
`;

const Item = styled.main`
	flex: 1;
	margin-left: ${32 + 256}px;
`;

export const Layout: React.FC = ({children}) => {
	const token = useSelector(state => state.session.token);
	const location = useLocation();

	const requirePlain = location.pathname === '/' && !token;

	return requirePlain ? <>{children}</> : (
		<LayoutWrapper>
			<Menu />
			<Item>{children}</Item>
		</LayoutWrapper>
	);
};
