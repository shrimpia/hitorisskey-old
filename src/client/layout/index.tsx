import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router";
import { useXelticaUITheme } from "../hooks/use-xelticaui-theme";

import { useSelector } from "../store";
import { HeaderComponentSlot, HeaderTitle } from "../teleporters";
import { Menu } from "./menu";

const LayoutWrapper = styled.div`
	position: relative;
`;

const Item = styled.main`
	flex: 1;
	margin-left: ${32 + 256}px;
`;

const Header = styled.header`
	position: sticky;
	top: 0;
	z-index: 200;
	border-bottom: 1px solid var(--tone-2);
`;

export const Layout: React.FC = ({children}) => {
	useXelticaUITheme();

	const token = useSelector(state => state.session.token);
	const location = useLocation();

	const requirePlain = location.pathname === '/' && !token;

	return requirePlain ? <>{children}</> : (
		<LayoutWrapper>
			<Menu />
			<Item>
				<Header>
					<div className="navbar" style={{background: 'var(--bg)'}}>
						<h1 className="navbar-title text-size-large">
							<HeaderTitle.Target />
						</h1>
					</div>
					<HeaderComponentSlot.Target />
				</Header>
				{children}
			</Item>
		</LayoutWrapper>
	);
};
