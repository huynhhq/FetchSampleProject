import {MutableRefObject, useEffect, useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  IModifiersSpacing,
  IModifiersStyling,
  IModifiersLayout,
  IModifiersText,
} from 'custom-ui-kit';

const destructLayout = (props: IModifiersLayout) => {
  const style: StyleProp<ViewStyle> = {};
  style.alignItems = props.alignItems === true ? 'center' : props.alignItems;
  style.alignSelf = props.alignSelf === true ? 'center' : props.alignSelf;
  style.justifyContent =
    props.justifyContent === true ? 'center' : props.justifyContent;
  style.flex = props.flex === true ? 1 : props.flex;
  style.flexDirection = props.flexD;
  style.flexShrink = props.flexS;
  style.flexGrow = props.flexG;

  Object.keys(style).forEach(key => {
    if (!Object(style)[key]) {
      delete Object(style)[key];
    }
    delete Object(props)[key];
  });

  return style;
};

const destructSpacing = (props: IModifiersSpacing) => {
  const style: StyleProp<ViewStyle> = {};
  style.margin = props.margin;
  style.marginVertical = props.marginV;
  style.marginHorizontal = props.marginH;
  style.marginLeft = props.marginL;
  style.marginRight = props.marginR;
  style.marginBottom = props.marginB;
  style.marginTop = props.marginT;
  style.padding = props.padding;
  style.paddingVertical = props.paddingV;
  style.paddingHorizontal = props.paddingH;
  style.paddingLeft = props.paddingL;
  style.paddingRight = props.paddingR;
  style.paddingBottom = props.paddingB;
  style.paddingTop = props.paddingT;
  style.width = props.width;
  style.height = props.height;

  Object.keys(style).forEach(key => {
    if (!Object(style)[key]) {
      delete Object(style)[key];
    }
    delete Object(props)[key];
  });
  return style;
};

const destructStyling = (props: IModifiersStyling) => {
  const style: StyleProp<ViewStyle> = {};
  style.backgroundColor = props.bg;
  style.borderRadius = props.br;
  style.borderTopLeftRadius = props.brTL;
  style.borderTopRightRadius = props.brTR;
  style.borderBottomLeftRadius = props.brBL;
  style.borderBottomRightRadius = props.brBR;

  Object.keys(style).forEach(key => {
    if (!Object(style)[key]) {
      delete Object(style)[key];
    }
    delete Object(props)[key];
  });

  return style;
};

const destructText = (props: IModifiersText & TextProps) => {
  const style: TextStyle = {};

  style.fontSize = props.fontSize || style.fontSize;
  style.color = props.color;
  style.fontFamily = props.fontFamily;
  style.fontStyle = props.fontStyle;
  style.fontWeight = props.bold ? 'bold' : undefined;
  style.letterSpacing = props.letterSpacing;
  style.textAlign = props.textCenter ? 'center' : undefined;
  style.textDecorationColor = props.underlineColor;
  style.textDecorationLine = props.underline ? 'underline' : undefined;
  style.textTransform = props.textTransform;

  const flatten = StyleSheet.flatten([style, props.style]);

  Object.keys(flatten).forEach(key => {
    if (!Object(flatten)[key]) {
      delete Object(flatten)[key];
    }
    delete Object(props)[key];
  });
  return flatten;
};

const destructPropsToStyle = <T extends {}>(props: T) => {
  const layoutStyle = destructLayout(props);
  const spacingStyle = destructSpacing(props);
  const stylingStyle = destructStyling(props);
  const textStyle = destructText(props);

  return {
    _styles: {
      layoutStyle,
      spacingStyle,
      stylingStyle,
      textStyle,
    },
    _props: props,
  };
};

const useCombinedRefs = <T>(...refs: any[]): MutableRefObject<T> => {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as MutableRefObject<T>;
};

const getTextFieldPropertyValue = (
  values: any,
  formID: string,
  getType: 'VALUE' | 'OBJECT' = 'VALUE',
) => {
  if (Array.isArray(values?.data)) {
    const [, i, target] = formID.split('.');
    if (
      +i <= values?.data.length - 1 &&
      values?.data[+i].hasOwnProperty(target)
    ) {
      if (getType === 'OBJECT') {
        return values?.data[+i];
      }
      return values?.data[+i][target];
    }
    // trường hợp lấy props touched, nếu user chưa từng focus vào textfield thì return false.
    return false;
  }
  return values[formID];
};

export {destructPropsToStyle, useCombinedRefs, getTextFieldPropertyValue};
