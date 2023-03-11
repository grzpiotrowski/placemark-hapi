export const dashboardController = {
  index: {
    handler: async function (request, h) {
      return h.view("dashboard-view", { title: "Placemark - Dashboard" });
    },
  },
};
