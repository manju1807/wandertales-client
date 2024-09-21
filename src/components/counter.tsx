'use client';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from '@/store/slices/counter-slice';
import { Button } from './ui/button';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="text-center flex flex-col space-y-6">
      <h1>Counter: {count}</h1>
      <div className="flex flex-row gap-4">
        <Button
          variant={'default'}
          className="px-2 py-1"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button
          variant={'default'}
          className="px-2 py-1"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}
