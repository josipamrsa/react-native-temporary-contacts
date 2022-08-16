import React, { useState, useEffect } from 'react';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import Contacts from 'expo-contacts';

/* TASK SCHEDULING OPERATIONS */

// Defines task by providing a name and the function to be executed
// Needs to be called at global scope (not in any React component)
// The result of the function should always be returned in the correct type

const defineATask = (task) => {
  // TODO - pass the task name and function, this is only a test function
  TaskManager.defineTask(task, async () => {
    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
}

// Registers the task to execute at some timepoint in the app, together with
// configuration options for background fetch behaviour
// It does not need to be in the global scope as task defining
// Basic options - setting the interval (default in seconds), some specific options

async function registerBackgroundFetchAsync(task, interval) {
  // By default it executes in seconds - here it executes in minutes 
  // stopOnTerminate is Android-specific, the task executes even after app termination
  // startOnBoot is also Android-specific, task will execute at start-up of system
  return BackgroundFetch.registerTaskAsync(task, {
    minimumInterval: 60 * interval, 
    stopOnTerminate: false, 
    startOnBoot: true, 
  });
}

// Unregisters the task by its name (and is optional)
// Does not need to be in the global scope

async function unregisterBackgroundFetchAsync(task) {
  return BackgroundFetch.unregisterTaskAsync(task);
}

const useTaskManagerFunctions = (task) => {
  /* STATES */
  const [isRegistered, setIsRegistered] = useState(false);  // Task registered
  const [status, setStatus] = useState(null);               // Background fetch status

  useEffect(() => {
    // TODO - recalculate deletion date to minutes
    toggleFetchTask(task, isRegistered, 5); 
    checkStatusAsync(task, setStatus, setIsRegistered);
  }, []);

  /* METHODS */

  // Fetch background status (pending tasks), check task registration
  // After that, setup React states accordingly
  const checkStatusAsync = async (task, setStatus, setIsRegistered) => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(task);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  // If task is already registered, unregister it, otherwise try to
  // register the task for execution in specified interval
  const toggleFetchTask = async (task, isRegistered, interval = 1) => {
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

export default useContactTaskManager = {
  useTaskManagerFunctions,
  defineATask
};