import Subheading from "../text/Subheading";

export default function EditStudyModal({ onNameChange, onColorChange, onDelete, studyName }) {
    return (
        <View>
            <Subheading>{studyName}</Subheading>
        </View>
    );
}
