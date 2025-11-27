export function buildMenuTree(menus) {
  const map = {};
  const tree = [];

  menus.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  menus.forEach((item) => {
    if (item.parent_id) {
      map[item.parent_id].children.push(map[item.id]);
    } else {
      tree.push(map[item.id]);
    }
  });

  return tree.sort((a, b) => a.order - b.order);
}
