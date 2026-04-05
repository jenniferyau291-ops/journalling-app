// styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLOURS from "../../constants/colours";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.background,
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.background,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLOURS.border,
  },

  profileInfo: {
    flex: 1,
  },

  username: {
    fontSize: 20,
    fontWeight: "700",
    color: COLOURS.textPrimary,
    marginBottom: 4,
  },

  email: {
    fontSize: 14,
    color: COLOURS.textSecondary,
    marginBottom: 2,
  },

  memberSince: {
    fontSize: 12,
    color: COLOURS.textSecondary,
  },

  logoutButton: {
    backgroundColor: COLOURS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },

  logoutText: {
    color: COLOURS.white,
    fontWeight: "600",
    marginLeft: 8,
  },

  journalsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  journalsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLOURS.textPrimary,
  },

  journalsCount: {
    fontSize: 14,
    color: COLOURS.textSecondary,
  },

  journalsList: {
    paddingBottom: 20,
  },

  journalItem: {
    flexDirection: "row",
    backgroundColor: COLOURS.cardBackground,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLOURS.border,
  },


  journalInfo: {
    flex: 1,
    justifyContent: "space-between",
  },

  journalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOURS.textPrimary,
    marginBottom: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },

  journalCaption: {
    fontSize: 14,
    color: COLOURS.textDark,
    marginBottom: 4,
  },

  journalDate: {
    fontSize: 12,
    color: COLOURS.textSecondary,
  },

  deleteButton: {
    padding: 8,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 20,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOURS.textPrimary,
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },

  addButton: {
    backgroundColor: COLOURS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
  },

  addButtonText: {
    color: COLOURS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default styles;
