# POTENTIAL FUTURE FEATURES

## WILL BE ADDED
- [ ] Attribution of hardware logos used in category navbar in footer (Freepik, J703).
- [ ] Implement loading transition for all page loads.
- [80%] Implement the followings pages:
  + [100%] Login page.
  + [85%] Dashboard page.
    + [100%] Main page (stats).
    + [95%] List page.
      - [WIP] Improve support for smaller screens.
    + [WIP_95%] Create/modify page.
      - [100%] Add support for modification of admin entities.
      - [WIP] Add custom buttons for each entity.
      - [100%] Improve support for smaller screens.
    + [ ] Error page.
  + [ ] Frequently asked questions page.
  + [90%] Home page.
   - [ ] Replace banner element with custom image carousel.
   - [100%] Fix errors regarding no marcas showing up when none of them have an image.
  + [100%] Cart page.
   - [100%] Prevent client from finishing purchase based on stock limit conditions.
  + [95%] Products page.
   - [100%] Implement filter menu for mobile.
   - [ ] Fix sortMenu component not being properly aligned in /products page.
  + [100%] Checkout page.
   - [100%] Improve support for mobile screens.
   - [100%] Prevent clients from getting to step 2 of checkout if they are banned.
  + [100%] Product page.
  + [100%] Error page.

## LIKELY TO BE ADDED
- [ ] Adjust rate-limiting on back-end
- [ ] Refactor list page code.
- [95%] Implement notification system.
  - [ ] Improve information given on error notification. 
- [ ] Implemented skeleton (templates) for card components.

## UNLIKELY TO BE ADDED
- [WIP] Replace <a> components with <Link>
- [ ] Consume georef api (https://datosgobar.github.io/georef-ar-api/) for proper location data.
- [ ] Consume ArgentinaDatos API (https://argentinadatos.com/docs/operations/get-feriados.html) to prevent delivery of pedidos on holidays.