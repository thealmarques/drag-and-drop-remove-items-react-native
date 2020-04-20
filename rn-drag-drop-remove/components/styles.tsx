import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    floatingContainer: {
        position: "absolute",
        marginTop: 60,
        left: "45%",
        alignItems: "center",
        justifyContent: "center"
    },
    floatingIcon: {
        width: 40,
        height: 40
    },
    bottomContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-end",
        marginBottom: 20
    },
    imageContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10
    }
});