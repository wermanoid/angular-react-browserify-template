import { TestClass, Test, SetUp } from 'core/test';

@TestClass
export class MainControllerTests {
    @SetUp
    setup($controller) {
        'ngInject';
        this.ctrl = $controller('homeController');
    }

    @Test
    isDefined() {
        expect(this.ctrl).toBeDefined();
    }

    @Test
    fieldIsEqualTo12345() {
        expect(this.ctrl.field).toBe(1234);
    }

    @Test
    testMethodShouldReturnValue() {
        expect(this.ctrl.test()).toBe('value');
    }
}
