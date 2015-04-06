'use strict';

application.controller('mxAddEditSkillCtrl', function($scope, $state, $stateParams, $ionicModal, mxSkill) {
	$scope.isNewSkill = !$stateParams.skill;
	if (!$scope.isNewSkill) {
		$scope.curSkill = $stateParams.skill;
	}
	else {
		$scope.curSkill = {
			name: ''
		}
	}

	$ionicModal.fromTemplateUrl('addEditSkillModal.html', {
		scope: $scope,
//		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
		$scope.modal.show();
	});

	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
		$state.go('skills')
	}
	//Cleanup the modal when we're done with it!
  	$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  	});


	$scope.submit = function(skill) {
		console.log("createSkill clicked");
		if (skill.name==='') {
			alert("Please enter something in the Name field");
			return;
		}

		var skillResource = new mxSkill();
		skillResource.name = skill.name;
		if ($scope.isNewSkill) {
			skillResource.$addNew(successCallback, errorCallback);
		}
		else {
			skillResource.$edit({id: $scope.curSkill._id}, successCallback, errorCallback);
		}
		function successCallback(response) {
			if (response.msg === '') {			//empty = sucessful
				$scope.closeModal();	
			}
			else {
				alert("Error: " + response.msg);
			}
		};
		function errorCallback(error) {
			//TODO: test this at some point ;)
			alert("An error occurred trying to save this skill - please try again")			
		}
	}
});