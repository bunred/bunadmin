declare module "react-eva-icons" {

  interface MyComponentProps {
    name: string;
    size: "small"|"medium"|"large"|"xlarge";
    fill?: string;
  }

  export default function EvaIcon(props: MyComponentProps): Element<MyComponentProps>
}