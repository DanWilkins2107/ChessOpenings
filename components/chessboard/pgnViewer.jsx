import { View, Text } from "react-native";

function PGNViewer({ tree, level = 0 }) {
    return (
        <View>
            <Text style={{ marginLeft: level * 15 }}>{tree.move}</Text>
            {tree.comments.map((comment, index) => (
                <Text
                    key={index}
                    style={{ marginLeft: (level + 1) * 10, fontSize: 12, color: "gray" }}
                >
                    {comment.text}
                </Text>
            ))}
            {tree.children.map((child, index) => (
                <PGNViewer key={index} tree={child} level={level + 1} />
            ))}
        </View>
    );
}

export default PGNViewer;
