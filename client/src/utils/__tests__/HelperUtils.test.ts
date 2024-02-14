import { toast } from 'react-toastify';
import { cn, MissionState, MutationType, serverData, showErrorToast, showSuccessToast } from '../HelperUtils.ts';


jest.mock('react-toastify', () => ({
    toast: {
        dismiss: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('serverData', () => {
    it('should return server configuration with baseUrl', () => {
        process.env.DATA_URL = 'http://example.com';
        const config = serverData();
        expect(config.baseUrl).toBe('http://example.com');
    });
});

describe('showSuccessToast', () => {
    it('should call toast.success with provided message and options', () => {
        const message = 'Success message';
        showSuccessToast(message);
        expect(toast.dismiss).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith(message, {
            toastId: 1,
            autoClose: 500,
            style: { background: '#5CDD00', color: 'white' },
        });
    });
});

describe('showErrorToast', () => {
    it('should call toast.error with provided message and options', () => {
        const message = 'Error message';
        const id = 'error-id';
        showErrorToast(message, id);
        expect(toast.dismiss).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith(message, {
            toastId: id,
            autoClose: 500,
        });
    });
});

describe('cn', () => {
    it('should merge CSS classes correctly', () => {
        const result = cn('class1', 'class2', 'class3');
        expect(result).toBe('class1 class2 class3');
    });
});

describe('MissionState enum', () => {
    it('should have correct values', () => {
        expect(MissionState.PreFlight).toBe('Pre-flight');
        expect(MissionState.Flight).toBe('In-Flight');
        expect(MissionState.PostFlight).toBe('Post-Flight');
    });
});

describe('MutationType enum', () => {
    it('should have correct values', () => {
        expect(MutationType.PUT).toBe('PUT');
        expect(MutationType.POST).toBe('POST');
        expect(MutationType.DELETE).toBe('DELETE');
    });
});
