export async function getDBUser(userId: string | undefined) {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`);

    if (!res.ok) {
      if (res.status === 404) {
        // Handle the case where the user is not found
        console.warn("User not found in the database");
        return null;
      } else {
        console.error(`Failed to fetch user data: ${res.status}`);
        return null;
      }
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to propagate it
  }
}

export async function getExecutorProfile(userId: string | undefined) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/executorProfile/${userId}`
    );
    if (!res.ok) {
      if (res.status === 404) {
        console.warn("User profile not found in the database");
        return null;
      } else {
        console.error(`Failed to fetch user data: ${res.status}`);

        return null;
      }
    }
    return res.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getCreatorProfile(userId: string | undefined) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/creatorProfile/${userId}`
    );
    if (!res.ok) {
      if (res.status === 404) {
        console.warn("User profile not found in the database");
        return null;
      } else {
        console.error(`Failed to fetch user data: ${res.status}`);

        return null;
      }
    }
    return res.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getTasks(id: string | undefined) {
  try {
    const res = await fetch(`http://localhost:3000/api/getTask/${id}`);

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSentProposals(id: string | undefined) {
  try {
    const response = await fetch(`http://localhost:3000/api/proposal/${id}`);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleProposal(
  taskId: string | undefined,
  executorId: string | undefined
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/proposal/getSingleProposal/?taskId=${taskId}&executorId=${executorId}`
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getAcceptedProposal(userId: string | undefined) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/proposal/acceptedProposal/${userId}`
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getReceivedProposals(id: string | undefined) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/proposal/task/${id}`
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getConversations(id: string | undefined) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/conversations/${id}`
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getAllMessages() {
  try {
    const response = await fetch(`http://localhost:3000/api/messages`);

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
