export default function createAsyncThunk(type, asyncFunction) {
  const pending = `${type}/pending`;
  const fulfilled = `${type}/fulfilled`;
  const rejected = `${type}/rejected`;

  const thunk = (arg) => async (dispatch) => {
    dispatch({ type: pending });
    try {
      const result = await asyncFunction(arg);
      dispatch({ type: fulfilled, payload: result });
    } catch (error) {
      dispatch({ type: rejected, error });
    }
  };

  thunk.pending = pending;
  thunk.fulfilled = fulfilled;
  thunk.rejected = rejected;

  return thunk;
}
