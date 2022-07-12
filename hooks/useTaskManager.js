import React, { useState, useEffect } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const defineATask = (task) => {
  TaskManager.defineTask(task, async () => {
    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
}

async function registerBackgroundFetchAsync(task, interval) {
  return BackgroundFetch.registerTaskAsync(task, {
    minimumInterval: 5, // 5 seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync(task) {
  return BackgroundFetch.unregisterTaskAsync(task);
}

const useTaskManagerFunctions = (task) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    toggleFetchTask(task, isRegistered, 5);
    checkStatusAsync(task, setStatus, setIsRegistered);
  }, []);

  const checkStatusAsync = async (task, setStatus, setIsRegistered) => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(task);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async (task, isRegistered, interval) => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync(task);
    } else {
      await registerBackgroundFetchAsync(task, interval);
    }
  };

  return {
    checkStatusAsync,
    toggleFetchTask
    }
}

export default useTaskManager = {
  useTaskManagerFunctions,
  defineATask
};