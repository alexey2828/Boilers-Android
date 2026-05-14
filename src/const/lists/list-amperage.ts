export function listAmperage(
  _jsonFromServer: any,
  activeTenAmperageBoiler1 = 0,
  activeTenAmperageBoiler2 = 0,
) {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const listAmperage = [
    {
      id: 1,
      title: 'Струм 1 з котла 1',
      value: activeTenAmperageBoiler1,
      graph: 'L1_1',
      borderColor: '#19D285',
    },
    {
      id: 2,
      title: 'Струм 2 з котла 1',
      value: activeTenAmperageBoiler1,
      graph: 'L1_2',
      borderColor: '#19D285',
    },
    {
      id: 3,
      title: 'Струм 3 з котла 1',
      value: activeTenAmperageBoiler1,
      graph: 'L1_3',
      borderColor: '#19D285',
    },
    {
      id: 4,
      title: 'Струм 1 з котла 2',
      value: activeTenAmperageBoiler2,
      graph: 'L2_1',
      borderColor: '#19D285',
    },
    {
      id: 5,
      title: 'Струм 2 з котла 2',
      value: activeTenAmperageBoiler2,
      graph: 'L2_2',
      borderColor: '#19D285',
    },
    {
      id: 6,
      title: 'Струм 3 з котла 2',
      value: activeTenAmperageBoiler2,
      graph: 'L2_3',
      borderColor: '#19D285',
    },
  ];
  return listAmperage;
}
