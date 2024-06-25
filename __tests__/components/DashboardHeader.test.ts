import { fireEvent, render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils';
import {it, expect, describe, vi} from "vitest";
import DashboardHeader from '~/components/DashboardHeader.vue';
import { createTestingPinia } from '@pinia/testing';
import * as authServices from '~/services/authservices';

describe("DashboardHeader", () => {

	vi.spyOn(authServices, 'logOut').mockReturnValue({})

	
	it("renders", async () => {
		const component = render(DashboardHeader, {
			global: {
				stubs: {
					RouterLink: RouterLinkStub
				},
				plugins: [
					createTestingPinia({
						initialState: {
							auth: {
								loggedUser: {
									firstName: "Bruce",
									lastName: "Wayne"
								},
							}
						}
					})
				]
			}
		});
		expect(screen).toMatchSnapshot();
		await fireEvent.click(screen.getByTestId("myaccount"))
		expect(screen.getByText("My Orders")).toBeTruthy()
		await fireEvent.click(screen.getByText("Sign out"))
		expect(screen.getByText("Yes")).toBeTruthy();
		fireEvent.click(screen.getByText("Yes"))
		expect(authServices.logOut).toBeCalled();
	})
})