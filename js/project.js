let tabData = null;

// Function to fetch data if not already loaded
async function getTabData() {
  if (!tabData) {
    try {
      const response = await fetch("../data.json");
      tabData = await response.json();
    } catch (error) {
      console.error("Error loading tab data:", error);
      return null;
    }
  }
  return tabData;
}

// Function to dynamically fetch and update tab content based on tabId
async function updateTabContent(tabId, pageTitle) {
  const data = await getTabData();
  if (!data || !data.properties) {
    console.error("No data available");
    return;
  }

  const property = data.properties.find((p) => p.pageTitle === pageTitle);
  if (!property) {
    console.error("Property not found");
    return;
  }

  try {
    switch (tabId) {
      case "overview":
        updateOverviewTab(property);
        break;
      case "price-list":
        updatePriceListTab(property);
        break;
      case "project-overview":
        updateProjectOverviewTab(property);
        break;
      default:
        console.warn("Unknown tab ID:", tabId);
    }
  } catch (error) {
    console.error(`Error updating ${tabId} tab:`, error);
  }
}

function updateOverviewTab(property) {
  const overview = property.projectOverview;
  const selectors = [
    { selector: ":nth-child(1) .value", value: overview.status },
    { selector: ":nth-child(2) .value", value: overview.unitSizes },
    { selector: ":nth-child(3) .value", value: overview.totalUnits },
    { selector: ":nth-child(4) .value", value: overview.launchDate },
    { selector: ":nth-child(5) .value a", value: overview.locality?.name },
    { selector: ":nth-child(6) .value", value: overview.configurations },
    { selector: ":nth-child(7) .value a", value: overview.builder?.name },
    { selector: ":nth-child(8) .value", value: overview.projectSize },
    { selector: ":nth-child(9) .value", value: overview.completionDate },
    {
      selector: ":nth-child(10) .value",
      value: overview.locationAdvantages?.name,
    },
  ];

  selectors.forEach(({ selector, value }) => {
    const element = document.querySelector(
      `#overview .overview-item${selector}`
    );
    if (element) {
      element.textContent = value || "N/A";
    }
  });
}

function updatePriceListTab(property) {
  const priceListTable = document.querySelector("#price-list table tbody");
  if (!priceListTable) return;

  const priceListTab = property.projectAbout?.tabs?.find(
    (tab) => tab.title === "Price List"
  );

  if (!priceListTab?.table) {
    priceListTable.innerHTML =
      "<tr><td colspan='3'>Price list not available</td></tr>";
    return;
  }

  priceListTable.innerHTML = priceListTab.table
    .map(
      (row) => `
            <tr>
                <td>${row.unitType || "N/A"}</td>
                <td>${row.area || "N/A"}</td>
                <td>${row.price || "N/A"}</td>
            </tr>
        `
    )
    .join("");
}

function updateProjectOverviewTab(property) {
  const projectOverview = document.querySelector(
    "#project-overview .tab-content"
  );
  if (!projectOverview) return;

  const projectOverviewTab = property.projectAbout?.tabs?.find(
    (tab) => tab.title === "Project Overview"
  );

  if (projectOverviewTab?.content) {
    projectOverview.innerHTML = projectOverviewTab.content;
  } else {
    projectOverview.innerHTML = "Project overview not available";
  }
}

// Modified showTab function to properly handle tab switching
async function showTab(tabId) {
  // Hide all tab contents and remove active classes
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab content
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }

  // Update active button
  const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeButton) {
    activeButton.classList.add("active");
  }

  // Get the page title from wherever it's defined in your application
  const pageTitle = document.querySelector("title")?.textContent || "";

  // Update the tab content
  await updateTabContent(tabId, pageTitle);
}
