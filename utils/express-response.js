const respond =
  ({ res, status }) =>
  (data) => {
    return data.paging
      ? res.status(status).json({ ...data })
      : res.status(status).json({ data: data.data ? data.data : data });
  };

export default respond;
