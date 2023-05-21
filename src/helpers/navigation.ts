import {CommonActions, NavigationContainerRef} from '@react-navigation/native';
import {ModalStackParamList, RootStackParamList} from 'root-stack-params';

let _navigator: NavigationContainerRef<ReactNavigation.RootParamList> | null =
  null;

function goBack() {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(CommonActions.goBack());
  }
}

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function goReset(name: keyof RootStackParamList, params = {}) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  }
}

function goResetAndNavigation(
  routeNames: {name: keyof RootStackParamList; params?: {}}[],
  activeIndex: number = 0,
) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.reset({
        index: activeIndex,
        routes: routeNames,
      }),
    );
  }
}

function goScreen(name: keyof RootStackParamList, params = {}) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

function goModal(
  screen: keyof ModalStackParamList,
  modalParams?: ModalStackParamList[keyof ModalStackParamList],
) {
  if (_navigator && _navigator.dispatch) {
    _navigator.dispatch(
      CommonActions.navigate({
        name: 'modal',
        params: {
          screen,
          params: modalParams,
        },
      }),
    );
  }
}

export {
  goBack,
  goReset,
  goScreen,
  setTopLevelNavigator,
  goModal,
  goResetAndNavigation,
};
