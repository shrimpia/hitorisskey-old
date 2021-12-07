import React from 'react';

export const Greeting: React.VFC = () => {
	return (
		<>
			<button className="btn primary block">アカウントを作成</button>
			<button className="btn block mt-2">ログイン</button>
			<div className="mt-4">
				それとも…
				<ul>
					<li><a href="#">発言を覗いてみる</a></li>
					<li><a href="#">もっと詳しく</a></li>
				</ul>
			</div>
		</>
	);
};
