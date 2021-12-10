import styled from "@emotion/styled";
import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import {
	FaHome,
	FaBell,
	FaEnvelope,
	FaCog,
	FaSearchPlus,
} from 'react-icons/fa';

const MenuWrapper = styled.nav`
	position: fixed;
	left: 0;
	top: 0;
	width: 288px;
	min-height: 100vh;
	padding: var(--margin);
	padding-top: calc(var(--margin) * 2);
	border-right: 1px solid var(--tone-2);
`;

const itemClassName: NavLinkProps['className'] = ({isActive}) => `item ${isActive ? 'active' : ''}`;

export const Menu: React.VFC = () => {
	return (
		<MenuWrapper>
			<h1 className="text-dimmed text-size-large mb-2 select-none" style={{borderBottom: 'none'}}>ひとりすきー</h1>
			<div className="menu">
				<section>
					<NavLink className="item" to="/">
						<span className="icon"><FaHome /></span> タイムライン
					</NavLink>
					<NavLink className={itemClassName} to="/announcements">
						<span className="icon"><FaBell /></span> お知らせ
					</NavLink>
					<NavLink className={itemClassName} to="/bottle-mail">
						<span className="icon"><FaEnvelope /></span> ボトルメール <sup className="text-dimmed">(Beta)</sup>
					</NavLink>
					<NavLink className={itemClassName} to="/settings">
						<span className="icon"><FaCog /></span> 設定
					</NavLink>
				</section>
				<section>
					<h1>ハッシュタグタイムライン</h1>
					<NavLink end className={itemClassName} to="/hashtags">
						<span className="icon"><FaSearchPlus /></span> ハッシュタグを検索する
					</NavLink>
					<NavLink className={itemClassName} to="/hashtags/DTM">
						<span className="icon">🎵</span> DTM
					</NavLink>
					<NavLink className={itemClassName} to="/hashtags/new-leaf">
						<span className="icon">🌸</span> 新生活
					</NavLink>
				</section>
			</div>
		</MenuWrapper>
	);
};
