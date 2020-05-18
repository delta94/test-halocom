export const calcDate = (date1, date2) => {
  var diff = Math.floor(date1.getTime() - date2.getTime());
  var day = 1000 * 60 * 60 * 24;
  var hour = 1000 * 60 * 60;
  var minute = 1000 * 60 * 60;
  var second = 1000 * 60;

  var seconds = Math.floor(diff / second);
  var minutes = Math.floor(diff / minute);
  var hours = Math.floor(diff / hour);
  var days = Math.floor(diff / day);
  var months = Math.floor(days / 31);
  var years = Math.floor(months / 12);
  var message = "";
  if (years > 0) message = `${years} years ago`;
  else if (months > 0) message = `${months} months ago`;
  else if (days > 0) message = `${days} days ago`;
  else if (hours > 0) message = `${hours} hours ago`;
  else if (minutes > 0) message = `${minutes} minutes ago`;
  else message = `${seconds} seconds ago`;

  return message;
};

export const createPagination = (
  page,
  totalPages,
  handleClickBackward,
  handleClickForward,
  handleClick
) => {
  let buttons = [];
  const currentIndex = parseInt(page) + 1;
  const lastIndex = parseInt(totalPages);
  if (currentIndex !== 1) {
    buttons.push({
      value: '<i class="icon-rewind"></i>',
      isActive: false,
      isDisabled: false,
      onClick: handleClickBackward,
    });
  }

  const low = currentIndex - 4 > 0 ? 4 : currentIndex - 1;
  const high = currentIndex + 4 <= lastIndex ? 4 : lastIndex - currentIndex;
  if (currentIndex - low >= 2) {
    buttons.push({
      value: 1,
      isActive: false,
      isDisabled: false,
      onClick: handleClick,
    });
    if (currentIndex - low > 2) {
      buttons.push({
        value: '<i class="icon-ellipsis"></i>',
        isActive: false,
        isDisabled: true,
      });
    }
  }
  for (var i = low; i > 0; i--) {
    buttons.push({
      value: currentIndex - i,
      isActive: false,
      isDisabled: false,
      onClick: handleClick,
    });
  }
  buttons.push({
    value: currentIndex,
    isActive: true,
    isDisabled: false,
  });
  for (i = 0; i < high; i++) {
    buttons.push({
      value: currentIndex + i + 1,
      isActive: false,
      isDisabled: false,
      onClick: handleClick,
    });
  }
  if (lastIndex - currentIndex >= 5) {
    if (lastIndex - currentIndex > 5) {
      buttons.push({
        value: '<i class="icon-ellipsis"></i>',
        isActive: false,
        isDisabled: true,
      });
    }

    buttons.push({
      value: lastIndex,
      isActive: false,
      isDisabled: false,
      onClick: handleClick,
    });
  }
  if (lastIndex !== currentIndex) {
    buttons.push({
      value: '<i class="icon-fast-forward"></i>',
      isActive: false,
      isDisabled: false,
      onClick: handleClickForward,
    });
  }
  return buttons;
};
