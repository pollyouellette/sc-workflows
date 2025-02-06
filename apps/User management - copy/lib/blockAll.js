var rows = table1.data;

const unblockedUsers = rows
  .map((row, index) => [row, index])
  .filter(([row]) => !row.blocked);

let blockIndex = 0;

const blockNext = () => {
  // Notify and quit when finished
  if (blockIndex >= unblockedUsers.length) {
    utils.showNotification({
      title: "Success",
      description: "Successfully blocked " + unblockedUsers.length + " users.",
      notificationType: "success",
      duration: 3,
    });

    // Update table after queries finish
    getUsers.trigger();

    return;
  }

  // Get next unblocked user and unblock them
  const [unblockedUser, index] = unblockedUsers[blockIndex];
  blockAllUsers.trigger({
    additionalScope: { i: index },
    onSuccess: function () {
      blockIndex++;
      blockNext();
    },
  });
};

blockNext();