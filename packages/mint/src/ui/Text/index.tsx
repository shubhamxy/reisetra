import {Typography, TypographyProps} from "@material-ui/core";
export interface TextProps extends TypographyProps {
  fontSize: string | number,
  color: any
}

export function Text(props: TextProps){
  const { fontSize, color, ...rest} = props;
  return <Typography variant="body1" component="span" style={{fontSize, color}} {...rest} />
}
