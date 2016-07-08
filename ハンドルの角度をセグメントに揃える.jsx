(function() {

	// Settings
	var settings = {
		'synchronize' : true,	// Synchronize a direction with an opposite one.
		'sameLength' : false,	// Make the left and right directions the same length.
		'smooth' : false,	// Set an anchor to smooth point.
		'showAlert' : true	// Show alert message.
	};

	// Title and version
	const SCRIPT_TITLE = 'ハンドルの角度をセグメントに揃える';
	const SCRIPT_VERSION = '0.5.0';

	// Document and selection
	var doc = app.activeDocument;
	var sel = doc.selection;

	// Get the target path points
	var targetPoints = getTargetPoints(sel);

	// Confirm and execute
	if(!doc || sel.length < 1) {
		if(settings.showAlert) alert('対象オブジェクトが選択されていません');
	} else if(sel.length > 1) {
		if(settings.showAlert) alert('2つ以上のオブジェクトが選択されています');
	} else if(targetPoints.length != 2) {
		if(settings.showAlert) alert('連続する2つのアンカーポイントか、単一のセグメントのみを選択してください');
	} else {
		mainProcess();
	}

	// Main process
	function mainProcess() {

			var point1 = getPathPointProperties(targetPoints[0]);
			var point2 = getPathPointProperties(targetPoints[1]);

			var radian = getAngle(point1.anchor, point2.anchor, false);

			point1.rightDirection.distance = getDistance(point1.anchor, point1.rightDirection);
			point1.leftDirection.distance = getDistance(point1.anchor, point1.leftDirection);
			point2.rightDirection.distance = getDistance(point2.anchor, point2.rightDirection);
			point2.leftDirection.distance = getDistance(point2.anchor, point2.leftDirection);

			point1.pathPoint.rightDirection = getPosition(radian, point1.rightDirection.distance, point1.anchor);
			point2.pathPoint.leftDirection = getPosition(radian, -point2.leftDirection.distance, point2.anchor);

			if(settings.synchronize) {
				if(settings.sameLength) {
					point1.pathPoint.leftDirection = getPosition(radian, -point1.rightDirection.distance, point1.anchor);
					point2.pathPoint.rightDirection = getPosition(radian, point2.leftDirection.distance, point2.anchor);
				} else {
					point1.pathPoint.leftDirection = getPosition(radian, -point1.leftDirection.distance, point1.anchor);
					point2.pathPoint.rightDirection = getPosition(radian, point2.rightDirection.distance, point2.anchor);
				}

				if(settings.smooth) {
					point1.pathPoint.pointType = PointType.SMOOTH;
					point2.pathPoint.pointType = PointType.SMOOTH;
				}

			}
	}

	// Get the target path points
	function getTargetPoints(selection) {
		var points = [];
		for(i = 0; i < selection.length; i++) {
			if(selection[i].typename == 'PathItem') {
				for(j = 0; j < selection[i].pathPoints.length; j++) {
					var nextIndex = j == selection[i].pathPoints.length - 1 ? 0 : j + 1;
					if(j == selection[i].pathPoints.length - 1 && !selection[i].closed) break;
					if((selection[i].pathPoints[j].selected == PathPointSelection.RIGHTDIRECTION && selection[i].pathPoints[nextIndex].selected == PathPointSelection.LEFTDIRECTION) || (selection[i].pathPoints[j].selected == PathPointSelection.ANCHORPOINT && selection[i].pathPoints[nextIndex].selected == PathPointSelection.ANCHORPOINT)) {
						points.push(selection[i].pathPoints[j]);
						points.push(selection[i].pathPoints[nextIndex]);
					}
				}
				break;
			}
		}
		return points;
	}

	// Get the path point propaties
	function getPathPointProperties(point) {
		return {
			'pathPoint' : point,
			'anchor' : {
				'x': point.anchor[0],
				'y': point.anchor[1]
			},
			'leftDirection' : {
				'x': point.leftDirection[0],
				'y': point.leftDirection[1]
			},
			'rightDirection' : {
				'x': point.rightDirection[0],
				'y': point.rightDirection[1]			
			}
		};
	}

	// Get the distance
	function getDistance(p1, p2) {
		return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
	}

	// Get the angle
	function getAngle(p1, p2, isDegree) {
		var radian = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		if(isDegree) {
			return radian / Math.PI * 180;
		} else {
			return radian;
		}
	}

	// Get the position from the angle and the distance
	function getPosition(radian, distance, offsetPoint) {
		return [
			Math.cos(radian) * distance + offsetPoint.x,
			Math.sin(radian) * distance + offsetPoint.y
		];
	}

}());