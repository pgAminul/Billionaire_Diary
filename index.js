let currentIndex = 0;
let dataStore = [];

// Centralized Element Selection
const elements = {
  tableData: document.getElementById("tableData"),
  sortingData: document.getElementById("sortingData"),
  totallMoney: document.getElementById("totallMoney"),
  sortMoney: document.getElementById("totallMoneySort"),
  soringMoney: document.getElementById("soringMoney"),
  TotallBanalce: document.getElementById("TotallBanalce"),
  table: document.getElementById("table"),
  tableForAllData: document.getElementById("tableForAllData"),
  loading: document.getElementById("loading"),
};

// Function to Render a Data Row
const ShowListData = (data) => {
  const { industries, personName, state, archivedWorth, rank, squareImage } =
    data;
  return `
    <tr>
      <td>
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-12 w-12">
              <img src=${squareImage} alt="Avatar" />
            </div>
          </div>
          <div>
            <h2 class="font-bold">
              ${personName}
              <span class="font-normal text-gray-400 cursor-pointer" onclick="handleDetails('${rank}')">
                <i class="fa-solid fa-eye"></i>
              </span>
            </h2>
            <h2 class="text-sm opacity-50">${state ? state : "not Found"}</h2>
          </div>
        </div>
      </td>
      <td><p>${state ? state : "not Found"}</p></td>
      <td>${industries}</td>
      <td>${rank ? rank : "Not Found"}</td>
      <td id='welth'>${archivedWorth ? archivedWorth : "NOT Found"}</td>
    </tr>
  `;
};

// API Fetch Function with Error Handling
const apiFetch = async () => {
  try {
    const url = "https://forbes400.onrender.com/api/forbes400?limit=20";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    dataStore = data;
    sortByData(data);
    allDataShow();
  } catch (error) {
    console.log("Fetch error:", error);
  }
};

// Show All Data
const allDataShow = () => {
  if (currentIndex >= dataStore.length) {
    console.log("datas");
  } else {
    const data = dataStore[currentIndex++];
    elements.tableData.innerHTML += ShowListData(data);

    let money = parseFloat(data.archivedWorth);
    elements.totallMoney.innerHTML =
      parseFloat(elements.totallMoney.innerText) + money;
  }
};

// Event Listener for Add User Button
document.getElementById("addUser").addEventListener("click", () => {
  apiFetch();
  elements.sortingData.classList.add("hidden");
  elements.soringMoney.classList.add("hidden");
  elements.tableData.classList.remove("hidden");
  elements.TotallBanalce.classList.remove("hidden");
  elements.table.classList.remove("hidden");
  elements.tableForAllData.classList.add("hidden");
});

// Loading Indicator
elements.loading.classList.remove("hidden");
setTimeout(() => {
  elements.loading.classList.add("hidden");
}, 5000);

// Double Money Button
document.getElementById("doubleMoney").addEventListener("click", () => {
  let double = document.querySelectorAll("#welth");
  let totalSum = 0;
  elements.soringMoney.classList.remove("hidden");
  elements.table.classList.remove("hidden");
  elements.tableForAllData.classList.add("hidden");

  double.forEach((money) => {
    let currentMoney = parseFloat(money.innerHTML);
    let result = currentMoney * 2;
    money.innerHTML = `${result}`;
    totalSum += result;
  });
  elements.totallMoney.innerHTML = totalSum;
});

// Sort By Rank
const sortByData = (datas) => {
  document.getElementById("highRank").addEventListener("click", () => {
    datas.sort((a, b) => b.rank - a.rank);
    AllDataSort(datas);
    elements.tableData.classList.add("hidden");
    elements.TotallBanalce.classList.add("hidden");
    elements.sortingData.classList.remove("hidden");
    elements.soringMoney.classList.remove("hidden");
    elements.table.classList.remove("hidden");
    elements.tableForAllData.classList.add("hidden");
  });
};

// Display Sorted Data
const AllDataSort = (data) => {
  elements.sortingData.innerHTML = ""; // Clear previous data
  let totalSum = 0;

  data.forEach((datas) => {
    elements.sortingData.innerHTML += ShowListData(datas);
    let money = parseFloat(datas.archivedWorth) || 0;
    totalSum += money;
  });

  elements.sortMoney.innerHTML = totalSum;
};

// Show Details Based on Rank
const showDetailsModal = (rank) => {
  const modal = document.getElementById("modal");
  const personDetails = dataStore.find(
    (person) => person.rank === parseInt(rank)
  );

  if (personDetails) {
    const {
      personName,
      industries,
      state,
      archivedWorth,
      abouts,
      squareImage,
    } = personDetails;
    modal.innerHTML = `
      <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <img src=${squareImage} alt="">
          <h3 class="text-lg font-bold">${personName}</h3>
          <p class='text-gray-600 pt-2'>Industries: ${industries}</p>
          <p class='text-gray-600 pt-2'>State: ${state}</p>
          <p class='text-gray-600 pt-2'>Total Wealth: ${archivedWorth}</p>
          <p class='text-gray-600 pt-2'>About ${personName}: ${abouts}</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;
    document.getElementById("my_modal_5").showModal();
  } else {
    alert("Details not found!");
  }
};

// Handle Details Click
const handleDetails = (rank) => {
  showDetailsModal(rank);
};

// Calculate Total Wealth
const AllWelth = async () => {
  const url = "https://forbes400.onrender.com/api/forbes400";
  const res = await fetch(url);
  const data = await res.json();
  calculateWelth(data);
};

const calculateWelth = (totallWelth) => {
  let totallMoney = 0;
  const WelthCalculate = document.getElementById("WelthCalculate");
  const totallWelthData = document.getElementById("totallWelthData");

  WelthCalculate.addEventListener("click", () => {
    elements.sortingData.classList.add("hidden");
    elements.tableData.classList.add("hidden");
    elements.TotallBanalce.classList.add("hidden");
    elements.soringMoney.classList.add("hidden");
    elements.table.classList.add("hidden");
    elements.tableForAllData.classList.remove("hidden");

    totallWelth.forEach((welth) => {
      const { personName, state, archivedWorth, rank } = welth;
      totallWelthData.innerHTML += `
        <tr>
          <td>${rank}</td>
          <td>${personName ? personName : "NOT FOUND"}</td>
          <td>${state ? state : "NOT FOUND"}</td>
          <td>${archivedWorth ? archivedWorth : "NOT FOUND"}</td>
        </tr>
      `;
      if (archivedWorth && !isNaN(archivedWorth)) {
        let totall = parseFloat(archivedWorth);
        totallMoney += totall;
      }

      document.getElementById("totalWealth").innerHTML = `
        Calculate Entire Wealth is $ ${totallMoney}
      `;
    });
  });
};

AllWelth();
allDataShow();
