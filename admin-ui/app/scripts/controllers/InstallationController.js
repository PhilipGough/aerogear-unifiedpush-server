/*
 * JBoss, Home of Professional Open Source
 * Copyright Red Hat, Inc., and individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

angular.module('upsConsole').controller('InstallationController',
  function($rootScope, $routeParams, installationsEndpoint, $sce, data) {

  var $scope = this;

  $scope.currentPage = 1;

  $scope.expand = function (installation) {
    installation.expand = !installation.expand;
  };

  $scope.isCollapsed = function (installation) {
    return !installation.expand;
  };

  $scope.pageChanged = function () {
    $rootScope.isViewLoading = true;
    fetchInstallations($scope.currentPage).then(function() {
      $rootScope.isViewLoading = false;
    });
  };

  $scope.update = function (installation) {
    delete installation.expand;
    var params = {variantId: $routeParams.variantId, installationId: installation.id};
    installation.enabled = !installation.enabled;
    installationsEndpoint.update(params, installation);
  };

  function updateData(data) {
    $scope.installations = data.page;
    $scope.totalItems = data.total;
  }

  function fetchInstallations(pageNo) {
    return installationsEndpoint.fetchInstallations($routeParams.variantId, pageNo).then(updateData);
  }

  updateData(data);
});
