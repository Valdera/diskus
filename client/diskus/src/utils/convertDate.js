export const convertDate = (input) => {
  const date = new Date(input);
  const arrDate = date.toUTCString().split(' ');
  let months = {
    Jan: 'Januari',
    Feb: 'Februari',
    Mar: 'Maret',
    Apr: 'April',
    May: 'Mei',
    Jun: 'Juni',
    Jul: 'Juli',
    Aug: 'Agustus',
    Sep: 'September',
    Oct: 'Oktober',
    Nov: 'November',
    Dec: 'Desember'
  };
  const month = months[arrDate[2]];
  return `${arrDate[1]} ${month} ${arrDate[3]}`;
};
