
const endpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/taskmanager';

export const validateResponse = (errored, response) => {
    if (errored) {
        // message.error(
        // "Could not update cart. Check that the backend is running, reachable and returns valid JSON."
        // );
        return false;
    } else if (response.message) {
        // message.error(response.message);
        return false;
    }

    return true;
};


export const createTask = async ({mode, data}) => {
    let response = {};
    let errored = false;

    try {
        const hasFile = data && data.linkedFile && typeof data.linkedFile !== 'string';

        if (hasFile) {
            const fd = new FormData();
            if (data.title !== undefined) fd.append('title', data.title);
            if (data.description !== undefined) fd.append('description', data.description);
            if (data.deadline !== undefined) fd.append('deadline', data.deadline);
            if (data.status !== undefined) fd.append('status', data.status);
            fd.append('linkedFile', data.linkedFile);

            response = await (await fetch(`${endpoint}/`, {
                method: 'POST',
                body: fd
            })).json();
        } else {
            response = await (await fetch(`${endpoint}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    deadline: data.deadline,
                    status: data.status
                })
            })).json();
        }
    } catch (e) {
        errored = true;
    }

    return { ok: validateResponse(errored, response), response };
}

export const updateTask = async ({mode, data}) => {
    let response = {};
    let errored = false;

    try {
        const id = (data && (data.id || data._id)) || (typeof mode === 'string' ? mode : null);
        if (!id) throw new Error('Missing id for updateTask');

        const hasFile = data && data.linkedFile && typeof data.linkedFile !== 'string';

        if (hasFile) {
            const fd = new FormData();
            if (data.title !== undefined) fd.append('title', data.title);
            if (data.description !== undefined) fd.append('description', data.description);
            if (data.deadline !== undefined) fd.append('deadline', data.deadline);
            if (data.status !== undefined) fd.append('status', data.status);
            fd.append('linkedFile', data.linkedFile);

            response = await (await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                body: fd
            })).json();
        } else {
            response = await (await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    deadline: data.deadline,
                    status: data.status
                })
            })).json();
        }
    } catch (e) {
        errored = true;
    }

    return { ok: validateResponse(errored, response), response };
}

export const getAllTask = async () => {
    let response ={};
    let errored = false;

    try {
        response = await (
            await fetch(`${endpoint}/`, {
                method: "GET"
            })
        ).json();
    } catch(e) {
        errored = true;
    }

    return { ok: validateResponse(errored, response), response };
}

export const deleteTask = async ({id}) => {
    let response = {};
    let errored = false;

    try {
        response = await (await fetch(`${endpoint}/${id}`, { method: 'DELETE' })).json();
    } catch (e) {
        errored = true;
    }

    return { ok: validateResponse(errored, response), response };
}