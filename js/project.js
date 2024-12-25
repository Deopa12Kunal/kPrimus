// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".nav-links") &&
    !event.target.closest(".mobile-menu-btn")
  ) {
    navLinks.classList.remove("active");
  }
});

// Dropdown Menu for Mobile
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector(".dropbtn");
  const content = dropdown.querySelector(".dropdown-content");

  if (window.innerWidth <= 768) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      // Close other dropdowns
      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.querySelector(".dropdown-content").style.display = "none";
        }
      });
      // Toggle current dropdown
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  }
});

// Action Buttons
document.querySelector(".btn-whatsapp").addEventListener("click", () => {
  // Add WhatsApp functionality
  alert("Opening WhatsApp...");
});

document.querySelector(".btn-callback").addEventListener("click", () => {
  // Add callback functionality
  alert("Requesting callback...");
});

// Read More
document.querySelector(".read-more").addEventListener("click", () => {
  // Add read more functionality
  alert("Loading full description...");
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    dropdowns.forEach((dropdown) => {
      dropdown.querySelector(".dropdown-content").style.display = "";
    });
  }
});


// Function to dynamically fetch and update tab content based on tabId
function updateTabContent(tabId) {
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      const property = data.properties.find((p) => p.pageTitle === pageTitle);
      if (!property) return;

      // Update content based on the selected tab
      if (tabId === "overview") {
        document.querySelector("#overview .overview-item:nth-child(1) .value").textContent = property.projectOverview.status;
        document.querySelector("#overview .overview-item:nth-child(2) .value").textContent = property.projectOverview.unitSizes;
        document.querySelector("#overview .overview-item:nth-child(3) .value").textContent = property.projectOverview.totalUnits;
        document.querySelector("#overview .overview-item:nth-child(4) .value").textContent = property.projectOverview.launchDate;
        document.querySelector("#overview .overview-item:nth-child(5) .value a").textContent = property.projectOverview.locality.name;
        document.querySelector("#overview .overview-item:nth-child(6) .value").textContent = property.projectOverview.configurations;
        document.querySelector("#overview .overview-item:nth-child(7) .value a").textContent = property.projectOverview.builder.name;
        document.querySelector("#overview .overview-item:nth-child(8) .value").textContent = property.projectOverview.projectSize;
        document.querySelector("#overview .overview-item:nth-child(9) .value").textContent = property.projectOverview.completionDate;
        document.querySelector("#overview .overview-item:nth-child(10) .value").textContent = property.projectOverview.locationAdvantages.name;
      } else if (tabId === "price-list") {
        // Update price list table with dynamic data
        const priceListTable = document.querySelector("#price-list table tbody");
        priceListTable.innerHTML = "";
        const priceListTab = property.projectAbout.tabs.find((tab) => tab.title === "Price List");
        priceListTab.table.forEach((row) => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${row.unitType}</td>
            <td>${row.area}</td>
            <td>${row.price}</td>
          `;
          priceListTable.appendChild(newRow);
        });
      } else if (tabId === "project-overview") {
        // Update project overview tab content dynamically
        const projectOverview = document.querySelector("#project-overview .tab-content");
        const projectOverviewTab = property.projectAbout.tabs.find((tab) => tab.title === "Project Overview");
        if (projectOverview && projectOverviewTab) {
          projectOverview.innerHTML = projectOverviewTab.content;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching or updating tab content:", error);
    });
}

// Modified showTab function to call updateTabContent based on tab selection
function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.getElementById(tabId).style.display = "block";
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

  // Fetch and update content dynamically for the selected tab
  updateTabContent(tabId);
}


