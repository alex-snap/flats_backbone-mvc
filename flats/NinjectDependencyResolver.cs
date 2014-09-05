using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Core.Services;
using Core.Services.Implementations;
using Ninject;
using Ninject.Web.Common;

namespace flats
{
    public class NDependencyResolver: IDependencyResolver
    {
        private readonly IKernel _kernel;

        public NDependencyResolver(IKernel kernel)
        {
            _kernel = kernel;
            AddBindings();
        }

        public object GetService(Type serviceType)
        {
            return _kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _kernel.GetAll(serviceType);
        }

        private void AddBindings()
        {
            _kernel.Bind<IFlatService>().To<FlatService>().InRequestScope();
            _kernel.Bind<IFileService>().To<FileService>().InRequestScope();
        }

    }
}