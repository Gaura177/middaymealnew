export const locations = {
  states: [
    { id: "state_1", name: "Uttar Pradesh" },
    { id: "state_2", name: "Maharashtra" }
  ],
  districts: [
    { id: "district_1", stateId: "state_1", name: "Lucknow" },
    { id: "district_2", stateId: "state_1", name: "Kanpur" },
    { id: "district_3", stateId: "state_2", name: "Mumbai" },
    { id: "district_4", stateId: "state_2", name: "Pune" }
  ],
  tehsils: [
    { id: "tehsil_1", districtId: "district_1", name: "Lucknow Tehsil" },
    { id: "tehsil_2", districtId: "district_2", name: "Kanpur Tehsil" },
    { id: "tehsil_3", districtId: "district_3", name: "Mumbai Tehsil" },
    { id: "tehsil_4", districtId: "district_4", name: "Pune Tehsil" }
  ]
}