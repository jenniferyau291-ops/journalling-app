import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.background,
  },

  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  header: {
    marginBottom: 16,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLOURS.primary,
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    textAlign: "center",
  },

  journalCard: {
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 3, // Android shadow
    borderWidth: 1,
    borderColor: COLOURS.border,
  },

  journalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },


  username: {
    fontSize: 15,
    fontWeight: "600",
    color: COLOURS.textPrimary,
  },

  bookDetails: {
    paddingHorizontal: 2,
  },

  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLOURS.textPrimary,
    marginBottom: 6,
  },

  ratingContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },

  caption: {
    fontSize: 14,
    color: COLOURS.textDark,
    marginBottom: 8,
    lineHeight: 20,
  },

  date: {
    fontSize: 12,
    color: COLOURS.textSecondary,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLOURS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },

  emptySubtext: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    textAlign: "center",
  },

  footerLoader: {
    marginVertical: 20,
  },
});

export default styles;
