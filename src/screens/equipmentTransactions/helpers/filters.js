export const filterEquipmentsByQuantity = (equipments) => {
  return equipments.filter(e => e.quantity_requested > 0)
}

export default filterEquipmentsByQuantity