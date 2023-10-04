import { useState } from "react";

import { categoryColors } from "../assets/utils/colors";

export function CategoryModal({mode}){
	// mode > 0: create, 1: edit
	const [name,changeName] = useState(mode==1 ? 'getName' : '');
	const [color,changeColor] = useState(mode==1 ? 'getColor' : categoryColors.violet);
}