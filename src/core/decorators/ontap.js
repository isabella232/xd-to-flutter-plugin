/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe. 
*/

const { NodeDecorator } = require("./nodedecorator");
const { Stack } = require("../nodes/stack");

class OnTap extends NodeDecorator {
	static create(node, ctx) {
		if (!(node instanceof Stack)) { return; }
		let param = node.getParam("onTap");
		if (param && param.exportName && param.isOwn) {
			return new OnTap(node, ctx);
		}
	}

	_serialize(nodeStr, serializer, ctx) {
		return OnTap.get(nodeStr, this.node.getParam("onTap").exportName);
	}
}
exports.OnTap = OnTap;

OnTap.get = function(nodeStr, onTap) {
	// This is also used by Component._serialize()
	if (!nodeStr || !onTap) { return nodeStr; }
	return 'GestureDetector(' +
		`onTap: ()=> ${onTap}?.call(), ` +
		`child: ${nodeStr}, ` +
	')';
}