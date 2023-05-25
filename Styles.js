import { StyleSheet } from "react-native";

export const colors = {
  darkBg: "#222",
  lightBg: "#333",
  darkHl: "#666",
  lighHl: "#888",
  pink: "#ea3372",
  black: "#000000",
  purple: "#9400d3",
  text: "#fff",
  textSec: "#aaa",
  darkGray: "#5A5A5A"
};

export const gs = StyleSheet.create({
  sectionContainer: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 8,
    backgroundColor: colors.lightBg,
  },
  sectionTitle: {
    fontWeight: "700",
    color: colors.text,
    fontSize: 15,
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    borderBottomColor: "#444",
    borderBottomWidth: 1,
    marginVertical: 24,
  },
  title: {
    color: colors.text,
    fontSize: 30,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    letterSpacing: 1,
  },
  smallText:{
    fontSize:12,
    fontWeight: "800",
    color: colors.text
  },
  absoluteFull: {
    position: "absolute",
    top:0,
    left:0,
    width:"100%",
    height: "100%"
  },
  button:{
    justifyContent: "center",
    alignItems: "center",
    borderRadius:100,
  }
});
