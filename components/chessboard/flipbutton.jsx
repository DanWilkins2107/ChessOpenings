import { Button } from "react-native";

const FlipButton = ({ onClick }) => (
    <Button onPress={onClick} title="Flip" />
);

export default FlipButton;