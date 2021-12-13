import React from "react";
import { BsPencilFill } from "react-icons/bs";

export const PostFormButton: React.VFC = () => {
	return (
		<button className="btn primary fix-bottom-right-2 flex f-center f-middle pa-2 shadow-1">
			<BsPencilFill className="mr-1 text-size-larger" style={{lineHeight: 1}} />
			新規投稿
		</button>
	);
};
