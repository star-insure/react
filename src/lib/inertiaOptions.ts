import type { VisitOptions } from '@inertiajs/inertia/types';
import { useToast } from './toast';

interface Options {
    successMessage?: string;
}

export function useInertiaOptions({ successMessage = '' }: Options): VisitOptions {
    const { addToast } = useToast();

    return {
        onSuccess: () => {
            addToast({
                message: successMessage ?? 'Your request was successful.',
                status: 'success',
            });
        },
        onError: (errors) => {
            Object.values(errors).forEach((err) => {
                addToast({
                    message: err,
                    status: 'error',
                });
            });
        }
    }
}
